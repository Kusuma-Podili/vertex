import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export interface ImmutableAuditEntry {
  entryId: string;
  timestamp: string;
  actorId: string;
  action: string;
  targetResource: string;
  resourceId: string;
  previousStateDigest?: string;
  newStateDigest: string;
  hash: string;
}

@Injectable()
export class ImmutableAuditTrailService {
  private auditLogChain: ImmutableAuditEntry[] = [];

  recordEvent(
    actorId: string,
    action: string,
    targetResource: string,
    resourceId: string,
    previousState: any,
    newState: any
  ): ImmutableAuditEntry {
    const timestamp = new Date().toISOString();
    const entryId = `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const previousDigest = previousState ? this.hashObject(previousState) : undefined;
    const newDigest = this.hashObject(newState);

    const prevHash = this.auditLogChain.length > 0 ? this.auditLogChain[this.auditLogChain.length - 1].hash : '0000000000000000';
    const payload = `${prevHash}|${timestamp}|${actorId}|${action}|${targetResource}|${resourceId}|${newDigest}`;
    const hash = crypto.createHash('sha256').update(payload).digest('hex');

    const entry: ImmutableAuditEntry = {
      entryId,
      timestamp,
      actorId,
      action,
      targetResource,
      resourceId,
      previousStateDigest: previousDigest,
      newStateDigest: newDigest,
      hash,
    };

    this.auditLogChain.push(entry);
    return entry;
  }

  verifyChainIntegrity(): boolean {
    for (let i = 1; i < this.auditLogChain.length; i++) {
      const prev = this.auditLogChain[i - 1];
      const curr = this.auditLogChain[i];
      const payload = `${prev.hash}|${curr.timestamp}|${curr.actorId}|${curr.action}|${curr.targetResource}|${curr.resourceId}|${curr.newStateDigest}`;
      const recomputed = crypto.createHash('sha256').update(payload).digest('hex');
      if (recomputed !== curr.hash) {
        return false;
      }
    }
    return true;
  }

  private hashObject(obj: any): string {
    return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
  }
}
