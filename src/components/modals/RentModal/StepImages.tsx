import Heading from "@/components/Heading";
import ImageUpload from "@/components/inputs/ImageUpload";

type Props = {
  imageSrc: string;
  setCustomValue: (id: string, value: any) => void;
};

export default function StepImages({ setCustomValue, imageSrc }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <ImageUpload
        onChange={(value) => setCustomValue("imageSrc", value)}
        value={imageSrc}
      />
    </div>
  );
}
