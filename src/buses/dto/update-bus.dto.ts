import { IsNumber, IsString, Length } from 'class-validator'

export class UpdateBusDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(17, 17, { message: 'Вин номер должен состоять из 17 символов' })
  vin: string

  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1, { message: 'Категория должна содержать 1 букву' })
  category: string

  brand: string

  model: string

  @IsNumber()
  busRoutesId: number
}
