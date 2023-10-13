import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => (
  <Image
    src={src || "/images/placeholder.jpg"}
    alt="Avatar"
    width={30}
    height={30}
    className="rounded-full"
  />
);

export default Avatar;
