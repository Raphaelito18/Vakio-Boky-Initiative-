import CoverImage from '../../../public/assets/images/2.webp';
import CoverImage2 from '../../../public/assets/images/3.webp';
import CoverImage3 from '../../../public/assets/images/8.webp';

const booksData = [
  {
    title: "Orgueil et Préjugés",
    coverImage: CoverImage,
    language: "Français",
    publicationDate: "28 Jan 1813",
    author: "Jane Austen",
    theme: "Romance",
    downloadLink: "/download/orgueil-et-prejuges.pdf"
  },
  {
    title: "Les Misérables",
    coverImage: CoverImage2,
    language: "Français",
    publicationDate: "3 Avril 1862",
    author: "Victor Hugo",
    theme: "Drame",
    downloadLink: "/download/les-miserables.pdf"
  },
  {
    title: "Le Petit Prince",
    coverImage: CoverImage3,
    language: "Français",
    publicationDate: "6 Avril 1943",
    author: "Antoine de Saint-Exupéry",
    theme: "Conte",
    downloadLink: "/download/le-petit-prince.pdf"
  },
];

export default booksData;
