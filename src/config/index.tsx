
interface OptionType {
    value: string
    label: string
}

export const currencyOptions = [
  { value: "PLN", label: "PLN" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
] as const satisfies OptionType[];

export const productAttributesOptions = [
  { value: "bluetooth", label: "Bluetooth" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "usb-c", label: "USB-C" },
  { value: "waterproof", label: "Wodoodporny" },
  { value: "wireless", label: "Bezprzewodowy" },
  { value: "ecological", label: "Ekologiczny" },
  { value: "premium", label: "Premium" },
]  as const satisfies OptionType[];

export const categoryOptions = [
  { value: "computers", label: "Komputery" },
  { value: "phones", label: "Telefony" },
  { value: "rtv", label: "RTV" },
  { value: "agd", label: "AGD" },
  { value: "accesories", label: "Akcesoria" },
] as const satisfies OptionType[];

export const producersOptions = [
  {
    value: "a",
    label: "producer A",
  },
  {
    value: "b",
    label: "producer B",
  },
  {
    value: "c",
    label: "producer C",
  },
] as const satisfies OptionType[];