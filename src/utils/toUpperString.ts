export default function toUpperCaseTransform(dto: any) {
  for (const key in dto) {
    if (typeof dto[key] == 'string') {
      dto[key] = dto[key].toUpperCase()
    }
  }
  return dto
}
