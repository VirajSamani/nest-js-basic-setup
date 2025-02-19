import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockfindone = jest.fn();
  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findOne: mockfindone,
    findFeatured: async () => [{ id: 'id' }],
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'name' };

    beforeEach(() => {
      mockfindone.mockResolvedValue(mockResult);
    });

    it('should return one episode', async () => {
      const result = await controller.findOne('id');
      expect(result).toEqual(mockResult);
    });
  });
});
