"use client";

import Script from "next/script";

export function Metrika() {
  const id = process.env.NEXT_PUBLIC_METRIKA_ID;
  if (!id || !/^\d+$/.test(id)) return null;

  return (
    <>
      <Script id="yandex-metrika-loader" strategy="afterInteractive" src="https://mc.yandex.ru/metrika/tag.js" />
      <Script id="yandex-metrika-init" strategy="afterInteractive">
        {`window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};window.ym.l=Date.now();ym(${id},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
      </Script>
    </>
  );
}
