"use client";

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Analytics configuration
const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PRB9DCMGPM',
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || '0000000',
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'your_token_here',
  POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || 'your_key_here',
  FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '000000000000000',
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    hj: (...args: unknown[]) => void;
    mixpanel: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
    posthog: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, properties?: Record<string, unknown>) => void;
    };
    fbq: (...args: unknown[]) => void;
  }
}

// Google Analytics 4
export const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
};

// Hotjar Heatmaps & Session Recordings
export const Hotjar = () => (
  <Script
    id="hotjar"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${ANALYTICS_CONFIG.HOTJAR_ID},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
    }}
  />
);

// Mixpanel Analytics
export const Mixpanel = () => (
  <Script
    id="mixpanel"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f="set_group_set set_group_unset set_group_increment set_group_append set_group_union set_group_remove get_group list_groups".split(" ");for(h=0;h<f.length;h++)c(e.people,f[h]);a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
        mixpanel.init("${ANALYTICS_CONFIG.MIXPANEL_TOKEN}", {debug: false});
      `,
    }}
  />
);

// PostHog Product Analytics
export const PostHog = () => (
  <Script
    id="posthog"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('${ANALYTICS_CONFIG.POSTHOG_KEY}',{api_host:'https://app.posthog.com'})
      `,
    }}
  />
);

// Facebook Pixel
export const FacebookPixel = () => (
  <Script
    id="facebook-pixel"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID}');
        fbq('track', 'PageView');
      `,
    }}
  />
);

// Analytics utilities for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // Mixpanel
  if (window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }

  // PostHog
  if (window.posthog) {
    window.posthog.capture(eventName, properties);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, properties);
  }
};

// Identify user
export const identifyUser = (userId: string, properties?: Record<string, unknown>) => {
  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      user_id: userId,
      custom_map: properties
    });
  }

  // Mixpanel
  if (window.mixpanel) {
    window.mixpanel.identify(userId);
    if (properties) {
      window.mixpanel.people.set(properties);
    }
  }

  // PostHog
  if (window.posthog) {
    window.posthog.identify(userId, properties);
  }
};

// Main Analytics Component
const Analytics = () => {
  return (
    <>
      <GoogleAnalytics />
      <Hotjar />
      <Mixpanel />
      <PostHog />
      <FacebookPixel />
    </>
  );
};

export default Analytics; 