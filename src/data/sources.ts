import type { SourceRecord } from "@/types";

export const sources: SourceRecord[] = [
  {
    id: "2gis",
    title: "2ГИС — Наш Город, агентство недвижимости",
    url: "https://2gis.ru/bratsk/firm/70000001063412933",
    confirms: "Офис, телефон, юридическое краткое имя, VK, WhatsApp, Telegram, рейтинг и отзывы.",
    confidence: "high",
    checkedAt: "2026-07-16",
    limitations: "Рейтинг и количество отзывов меняются; точный недельный график требует подтверждения.",
  },
  {
    id: "domclick-agency",
    title: "Домклик — профиль агентства",
    url: "https://agencies.domclick.ru/agency/305964",
    confirms: "ИНН, офис, состав команды, публичные объявления и отзывы о проведённых сделках.",
    confidence: "high",
    checkedAt: "2026-07-16",
    limitations: "Показатели сделок меняются и отличаются на уровне агентства и отдельных риелторов.",
  },
  {
    id: "domclick-agent",
    title: "Домклик — Екатерина Попова",
    url: "https://agencies.domclick.ru/agent/24502397",
    confirms: "Имя, роль руководителя, услуги, ипотека, аренда и сопровождение документов.",
    confidence: "high",
    checkedAt: "2026-07-16",
    limitations: "Стаж в описании указан самим пользователем профиля.",
  },
  {
    id: "rbc",
    title: "РБК Компании — юридическое лицо",
    url: "https://companies.rbc.ru/id/1223800014052-obschestvo-s-ogranichennoj-otvetstvennostyu-agentstvo-nedvizhimosti-nash-gorod/",
    confirms: "Полное название, ИНН, ОГРН, дата регистрации, руководитель и виды деятельности.",
    confidence: "high",
    checkedAt: "2026-07-16",
    limitations: "Юридический адрес похож на жилой и на публичном сайте не воспроизводится.",
  },
];
