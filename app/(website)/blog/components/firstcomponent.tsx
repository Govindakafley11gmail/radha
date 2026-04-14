
import Image from "next/image";

type Props = {
  image: string;
  header: string;
  content: string;
};

export default function FirstComponentBlog({ image, header, content }: Props) {
  return (
    <div>
      <Image src={image} width={200} height={200} alt="src" />
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
  );
}
