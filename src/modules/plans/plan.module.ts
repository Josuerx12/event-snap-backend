import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { planUseCases } from '../../core/plans/application/use-cases';
import { PlanService } from './plan.service';
import { Plan } from '../../core/plans/domain/entities/plan.entity';
import { PlanController } from './plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [...planUseCases, PlanService],
})
export class PlanModule {}
