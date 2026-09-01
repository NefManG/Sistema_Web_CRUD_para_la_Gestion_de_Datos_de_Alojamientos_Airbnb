from pydantic import BaseModel, Field
from decimal import Decimal


class AlojamientoCreate(BaseModel):
    name: str = Field(..., description="Nombre del alojamiento")
    property_type: str = Field(..., description="Tipo de propiedad")
    room_type: str = Field(..., description="Tipo de habitación")
    accommodates: int = Field(..., description="Número de personas que puede alojar")
    bedrooms: int = Field(..., description="Número de habitaciones")
    beds: int = Field(..., description="Número de camas")
    price: Decimal = Field(..., description="Precio del alojamiento")


class AlojamientoUpdate(BaseModel):
    name: str | None = Field(default=None, description="Nombre del alojamiento")
    property_type: str | None = Field(default=None, description="Tipo de propiedad")
    room_type: str | None = Field(default=None, description="Tipo de habitación")
    accommodates: int | None = Field(default=None, description="Número de personas que puede alojar")
    bedrooms: int | None = Field(default=None, description="Número de habitaciones")
    beds: int | None = Field(default=None, description="Número de camas")
    price: Decimal | None = Field(default=None, description="Precio del alojamiento")