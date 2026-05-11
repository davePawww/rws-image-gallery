import Container from '@/components/layout/container';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useThemeSync } from '@/hooks/use-theme-sync';
import ImageGalleryPage from '@/pages/image-gallery.page';

function App() {
  useThemeSync();

  return (
    <Container>
      <Header />
      <Content>
        <ImageGalleryPage />
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
