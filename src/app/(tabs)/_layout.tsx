import { Tabs } from 'expo-router';

import { FloatingTabBar } from '@/ui/FloatingTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
    >
      <Tabs.Screen name="home" options={{ title: 'Bugün' }} />
      <Tabs.Screen name="stats" options={{ title: 'İstatistik' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
