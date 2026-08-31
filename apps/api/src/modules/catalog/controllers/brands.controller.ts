import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  async getAllBrands() {
    return [
      { id: 'brand-aero', name: 'AeroAcoustics', slug: 'aeroacoustics' },
      { id: 'brand-quantum', name: 'QuantumTech', slug: 'quantumtech' },
      { id: 'brand-ergo', name: 'ErgoForm Design', slug: 'ergoform' },
      { id: 'brand-barista', name: 'BaristaCraft', slug: 'baristacraft' },
      { id: 'brand-nordic', name: 'Nordic Heritage', slug: 'nordic-heritage' },
    ];
  }
}
