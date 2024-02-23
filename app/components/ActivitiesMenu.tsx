import { Carousel, CarouselContent, CarouselItem } from "@ui/carousel"
import {
  FileBadgeIcon,
  FileBoxIcon,
  FileClockIcon,
  FileKey2Icon,
  FilePieChartIcon,
} from "lucide-react"
import { ActivitiesButton } from "./ActivitiesButton"

export function ActivitiesMenu() {
  return (
    <Carousel opts={{ align: "center" }} className="w-full cursor-grab blurred">
      <CarouselContent>
        <CarouselItem className="basis-[31%]">
          <ActivitiesButton
            href="/activities/mandatory"
            Icon={FileKey2Icon}
            className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/15"
          >
            Obrigatórias
          </ActivitiesButton>
        </CarouselItem>
        <CarouselItem className="basis-[31%]">
          <ActivitiesButton
            href="/activities/optative"
            Icon={FileClockIcon}
            className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/15"
          >
            Optativas
          </ActivitiesButton>
        </CarouselItem>
        <CarouselItem className="basis-[31%]">
          <ActivitiesButton
            href="/activities/complementary"
            Icon={FilePieChartIcon}
            className="bg-green-500/20 text-green-500 hover:bg-green-500/15"
          >
            Complementares
          </ActivitiesButton>
        </CarouselItem>
        <CarouselItem className="basis-[31%]">
          <ActivitiesButton
            href="/activities/extension"
            Icon={FileBoxIcon}
            className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/15"
          >
            Extensão
          </ActivitiesButton>
        </CarouselItem>
        <CarouselItem className="basis-[31%]">
          <ActivitiesButton
            href="/activities/internship"
            Icon={FileBadgeIcon}
            className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/15"
          >
            Estágio
          </ActivitiesButton>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
