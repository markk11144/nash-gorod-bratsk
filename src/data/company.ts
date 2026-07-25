import type { CompanyConfig } from "@/types";

export const company: CompanyConfig = {
  name: "Наш Город",
  legalName: "ООО «Агентство недвижимости „Наш Город“»",
  description:
    "Местное агентство недвижимости в Братске: помощь с покупкой, продажей, арендой, ипотекой и сопровождением сделки.",
  legal: {
    inn: "3804116882",
    ogrn: "1223800014052",
    registrationDate: "2022-08-01",
  },
  office: {
    full: "Братск, ул. Мира, 27, кабинет 205, 2 этаж",
    streetAddress: "ул. Мира, 27, кабинет 205",
    locality: "Братск",
    region: "Иркутская область",
    postalCode: "665717",
    floor: "2 этаж",
    office: "кабинет 205",
  },
  coordinates: { latitude: 56.153235, longitude: 101.619582 },
  schedule: {
    label: "Приём по предварительной записи",
    note: "Точное время визита лучше уточнить по телефону.",
    confidence: "needs-confirmation",
  },
  phone: { display: "+7 902 765-36-00", e164: "+79027653600" },
  email: null,
  website: null,
  links: {
    whatsapp: "https://wa.me/79027653600",
    telegram: "https://t.me/+79027653600",
    vk: "https://vk.com/public216141082",
    twoGis: "https://2gis.ru/bratsk/firm/70000001063412933",
    twoGisReviews: "https://2gis.ru/bratsk/firm/70000001063412933/tab/reviews",
    directions:
      "https://2gis.ru/bratsk/directions/points/%7C101.619582%2C56.153235%3B70000001063412933",
    domclick: "https://agencies.domclick.ru/agency/305964",
    max: "https://max.ru/u/f9LHodD0cOII1wUVMet3UaexDLSI_lo3UXOm1lOZgJpGS5EdTOEGRBW9rSQ",
  },
  rating: {
    value: 5,
    ratingCount: 82,
    reviewCount: 79,
    source: "2ГИС",
    checkedAt: "2026-07-16",
  },
};
