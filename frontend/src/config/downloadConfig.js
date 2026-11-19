/**
 * Campo Buddy App Download Configuration
 *
 * Update these URLs with your official Google Play Store, Apple App Store,
 * direct APK, or TestFlight links when available.
 */
export const downloadConfig = {
  android: {
    enabled: true,
    name: 'Campo Buddy',
    platform: 'Android',
    packageName: 'in.co.campo.buddy',
    version: '1.2.0',
    minOs: 'Android 8.0 (Oreo) or later',
    fileSize: '91 MB',
    rating: '4.8',
    reviewsCount: '2.4K+',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=in.co.campo.student', // Update with official Play Store or direct download link
    directApkUrl: '/downloads/CAMPO-BUDDY.apk', // Direct APK file path inside public/downloads/
    apkFileName: 'CAMPO-BUDDY.apk',
    badgeText: 'Try Beta Version',
    isBeta: true,
  },
  ios: {
    enabled: true,
    name: 'Campo Buddy',
    platform: 'iOS',
    appId: 'in.co.campo.buddy',
    version: '1.2.0',
    minOs: 'iOS 15.0 or later',
    fileSize: '32 MB',
    rating: '4.9',
    reviewsCount: '1.8K+',
    appStoreUrl: '', // Update when official App Store link is live
    testFlightUrl: '', // Optional TestFlight link
    badgeText: 'Coming Soon',
    comingSoon: true,
  },
  metadata: {
    title: 'Download Campo Buddy — Android & iOS',
    description:
      'Access fee payments, student profile, attendance, and timetables. Download the official Campo Buddy App for Android and iOS.',
    supportEmail: 'support@campo.co.in',
  },
};
