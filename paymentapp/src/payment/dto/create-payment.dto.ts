import { IsString, IsInt, IsNumber, IsUrl, IsNotEmpty, IsOptional, NotEquals, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePaymentDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly orderId: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly name: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly description: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly address: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly price: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly orderNumber: string;
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly category: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    readonly image: string;
}
