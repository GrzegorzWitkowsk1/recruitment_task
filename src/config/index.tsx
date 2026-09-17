
interface OptionType {
    value: string
    label: string
}

export const currencyOptions: OptionType[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
]

export const productAttributesOptions: OptionType[] = [
  { value: "bluetooth", label: "Bluetooth" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "usb-c", label: "USB-C" },
  { value: "waterproof", label: "Wodoodporny" },
  { value: "wireless", label: "Bezprzewodowy" },
  { value: "ecological", label: "Ekologiczny" },
  { value: "premium", label: "Premium" },
]

export const categoryOptions: OptionType[] = [
  { value: "computers", label: "Komputery" },
  { value: "phones", label: "Telefony" },
  { value: "rtv", label: "RTV" },
  { value: "agd", label: "AGD" },
  { value: "accesories", label: "Akcesoria" },
]

export const producersOptions: OptionType[] = [
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
]