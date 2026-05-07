import Container from '@/components/layout/components/container';
import Content from '@/components/layout/components/content';
import Footer from '@/components/layout/components/footer';
import Header from '@/components/layout/components/header';
import { useThemeSync } from '@/hooks/use-theme-sync';

function App() {
  useThemeSync();

  return (
    <Container>
      <Header />
      <Content>MainContent</Content>
      <Footer />
    </Container>
  );
}

export default App;
