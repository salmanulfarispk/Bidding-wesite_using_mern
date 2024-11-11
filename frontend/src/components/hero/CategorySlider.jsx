import { categorylists } from '../../assets/data'
import { CategoryCard,Heading,Container } from "../../router/index";

export const CategorySlider = () => {


  return (
    <>
      <section className="catgeory-slider pb-16">
        <Container>
          <Heading title="Browse the catgories" subtitle="Most viewed and all-time top-selling category" />

          <div className="grid grid-cols-2 md:grid-cols-7 gap-5 my-8">
            {categorylists.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};