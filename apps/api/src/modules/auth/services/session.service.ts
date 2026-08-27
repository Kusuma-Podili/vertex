import { Injectable } from '@nestjs/common';

export interface InMemorySession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
}

@Injectable()
export class SessionService {
  private sessions = new Map<string, InMemorySession>();

  async createSession(userId: string, token: string, refreshToken: string, ip: string, ua: string): Promise<InMemorySession> {
    const session: InMemorySession = {
      id: `sess-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      userId,
      token,
      refreshToken,
      ipAddress: ip,
      userAgent: ua,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000), // 7 days
    };
    this.sessions.set(token, session);
    this.sessions.set(refreshToken, session);
    return session;
  }

  async findSessionByRefreshToken(refreshToken: string): Promise<InMemorySession | undefined> {
    return this.sessions.get(refreshToken);
  }

  async invalidateSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }
}
