
import Images from "./global/images";
import Container from "./global/container";

const Companies = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-12 sm:py-16 md:py-20 mt-8 sm:mt-12 md:mt-16 companies overflow-hidden">
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[hsl(var(--app-text-muted))] leading-relaxed font-title">
                    Engineers at <span className="font-subheading italic text-cyan-400">leading</span> companies use Convertive
                </h4>
            </div>

            <Container delay={0.1}>
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-full overflow-x-auto px-4 pt-8 sm:pt-12 md:pt-16 text-muted-foreground transition-all whitespace-nowrap">
                    <Images.company1 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company2 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company3 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company6 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company7 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company9 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                    <Images.company10 className="h-5 sm:h-6 md:h-7 w-auto hover:text-[hsl(var(--app-text))] transition-colors duration-300" />
                </div>
            </Container>
        </div>
    )
};

export default Companies
