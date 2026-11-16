/**
 * Campo Student App Download Configuration
 *
 * Update these URLs with your official Google Play Store, Apple App Store,
 * direct APK, or TestFlight links when available.
 */
export const downloadConfig = {
  android: {
    enabled: true,
    name: 'Campo Student App',
    platform: 'Android',
    packageName: 'in.co.campo.student',
    version: '1.2.0',
    minOs: 'Android 8.0 (Oreo) or later',
    fileSize: '24 MB',
    rating: '4.8',
    reviewsCount: '2.4K+',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=in.co.campo.student', // Update with official Play Store or direct download link
    directApkUrl: '/downloads/campo-student-app.apk', // Direct APK file path inside public/downloads/
    apkFileName: 'campo-student-app.apk',
    badgeText: 'Try Beta Version',
    isBeta: true,
  },
  ios: {
    enabled: true,
    name: 'Campo Student App',
    platform: 'iOS',
    appId: 'in.co.campo.student',
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
    title: 'Download Campo Student App — Android & iOS',
    description:
      'Access fee payments, student profile, attendance, and timetables. Download the official Campo Student App for Android and iOS.',
    supportEmail: 'support@campo.co.in',
  },
};
