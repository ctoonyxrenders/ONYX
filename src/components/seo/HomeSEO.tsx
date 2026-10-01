import Head from "next/head";

const HomeSEO = () => {
    return (
        <Head>
            {/* Meta Tags for SEO */}
            <title>Onyx Renders | 3D Architectural Rendering & Visualization</title>
            <meta name="description" content="Onyx Renders offers high-quality 3D architectural rendering, visualization, animations, and Pano360. From interior & exterior 3D renderings to walkthroughs & virtual tours, we bring designs to life." />
            <meta name="keywords" content="3D architectural rendering, photorealistic rendering, 3D modeling, architectural visualization, exterior rendering, interior rendering, Pano360, 3D animation, walkthrough, virtual tours, 360 render, floor plan rendering, furniture modeling, product modeling, Austin architectural rendering, commercial rendering services." />
            <meta name="author" content="Onyx Renders" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph (For Social Media) */}
            <meta property="og:title" content="Onyx Renders | 3D Architectural Rendering & Visualization" />
            <meta property="og:description" content="High-quality 3D architectural rendering, visualization, animations, and Pano360 for real estate, architects, and interior designers." />
            <meta property="og:image" content="https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/485725962_122098756280816585_7073691600600806480_n.png?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFgHIBvOk0hbWmmXiNJgDrgVDvhqPpeBKtUO-Go-l4Eq0Uw7hhsgIxMeEI0iBSI2rzKZa5_y4VZ5AMhUvnHvQYW&_nc_ohc=FLR0iJzmvwUQ7kNvgHMG2WI&_nc_oc=Adn9EUwWKWQBx6LVodUnTxYGbEoFv6ivES_T-3LOsuqgbj3ASG0xOxbufT71MLGt76k&_nc_zt=23&_nc_ht=scontent.flhe3-1.fna&_nc_gid=swvAWVuTDQ7WNFo1g-bo2A&oh=00_AYGjyXlGM7EdiFEkqHULyEn4rUwOsHvZMBsXRjyrMLBwFg&oe=67EF6561" />
            <meta property="og:url" content="https://onyxrenders.com" />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Onyx Renders | 3D Architectural Rendering & Visualization" />
            <meta name="twitter:description" content="We specialize in photorealistic rendering, 3D modeling, Pano360, and architectural animations." />
            <meta name="twitter:image" content="https://onyxrenders.com/logo/logo1-theme.svg" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://onyxrenders.com" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HomeSEO;
