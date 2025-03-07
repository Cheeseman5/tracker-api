import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
    // id - UUID
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // title - string (255)
    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    // description - string (1024), optional
    @Column({ type: 'varchar', length: 1024, nullable: true })
    description: string;

    // status - enum
    @Column({ type: 'enum', enum: ['pending', 'in-progress', 'completed'], nullable: false })
    status: string;

    // createdAt - datetime (timezone)
    @Column({ type: 'timestamptz', nullable: false })
    createdAt: Date;

    // updatedAt - datetime (timezone)
    @Column({ type: 'timestamptz', nullable: false })
    updatedAt: Date;
}
