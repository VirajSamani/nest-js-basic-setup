import { Test, TestingModule } from '@nestjs/testing';
import { JwtStratergy } from './jwt.stratergy';

describe('JwtStratergy', () => {
  let provider: JwtStratergy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStratergy],
    }).compile();

    provider = module.get<JwtStratergy>(JwtStratergy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
