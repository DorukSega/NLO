window.onload = () => {
    const HeaderMenu = document.getElementById("HeaderMenu");
    const scroller = document.getElementById("scroller")
    const observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio === 0)
            HeaderMenu.classList.add("scrolled");
        else if (entries[0].intersectionRatio === 1)
            HeaderMenu.classList.remove("scrolled");
    }, {
        threshold: [0, 1]
    });
    observer.observe(scroller);

    const ifcont = document.getElementsByClassName("ifcont")[0];
    const ytb = document.getElementById('ytb')
    document.getElementById("btnmedia").onclick = () => {
        ifcont.classList.toggle("show")
        document.body.style.position = 'fixed'
        if (ytb.getAttribute("src") === '')
            ytb.src = "https://www.youtube-nocookie.com/embed/aM_gzfAMdNs?rel=0&showinfo=0&autohide=1&autoplay=1";
    }
    ifcont.onclick = (e) => {
        e.preventDefault();
        ifcont.classList.remove("show")
        ytb.src = ""
        document.body.style.position = 'unset'
    }
    const gordon = document.getElementById("gordon")
    document.getElementById('main-section').addEventListener('mousemove', e => {
        // Callback function
        const dX = -e.clientX / 60;
        const dY = (-e.clientY + (window.innerHeight)) / 60;
        gordon.style.transform = `translate3d(${dX}px, ${dY}px, 0px)`
    });

    const slider = document.getElementById("slider")
    if (slider) {
        slider.addEventListener("mousedown", (event) => {
            event.preventDefault();
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", () => document.removeEventListener("mousemove", handleMouseMove));
        })
    }

    const media_switch = document.getElementById("media-switch")
    const Media_Project = document.getElementById("Media-Project")
    const media_cur = document.getElementById("media-cur")
    let media_state = 0; // 0 means new, 1 old 
    media_switch.onclick = () => {
        Media_Project.classList.toggle("old")
        if (media_state) {
            media_state = 0;
            media_cur.src = media_cur.src.replace("_OLD", "_NEW")
        } else {
            media_state = 1;
            media_cur.src = media_cur.src.replace("_NEW", "_OLD")
        }
    }

    const gal_items = document.querySelectorAll(".gal-item")
    const gallery_cont = document.getElementById("gallery-cont")
    gal_items.forEach(el => {
        el.onclick = () => {
            if (el.classList.contains("gal-select"))
                return;
            document.querySelector(".gal-item.gal-select").classList.remove("gal-select")
            el.classList.add("gal-select")
            media_state = 0;
            Media_Project.classList.remove("old")
            const index = Array.from(gallery_cont.children).indexOf(el) + 1
            media_cur.src = `./assets/media/${index}_NEW.png`
        }
    })
    const larr = document.getElementById("larr")
    const rarr = document.getElementById("rarr")
    rarr.onclick = (e) => {
        e.preventDefault()
        const prevmedia = document.querySelector(".gal-item.gal-select")
        const g_items = Array.from(gallery_cont.children)
        const index = ((g_items.indexOf(prevmedia) + 1) % g_items.length) + 1
        const nextmedia = g_items[index - 1]

        prevmedia.classList.remove("gal-select")
        nextmedia.classList.add("gal-select")
        media_state = 0;
        Media_Project.classList.remove("old")

        media_cur.src = `./assets/media/${index}_NEW.png`
    }
    larr.onclick = (e) => {
        e.preventDefault()
        const prevmedia = document.querySelector(".gal-item.gal-select")
        const g_items = Array.from(gallery_cont.children)
        const index = g_items.indexOf(prevmedia) > 0 ? g_items.indexOf(prevmedia) : g_items.length
        const nextmedia = g_items[index - 1]

        prevmedia.classList.remove("gal-select")
        nextmedia.classList.add("gal-select")
        media_state = 0;
        Media_Project.classList.remove("old")

        media_cur.src = `./assets/media/${index}_NEW.png`
    }
}



function handleMouseMove(event) {
    event.preventDefault();

    const slider = document.getElementById("slider")
    const old_media = document.getElementById("old_media")
    const new_media = document.getElementById("new_media")
    const image_50_50 = document.getElementById("image-50-50")

    const dx = event.clientX;
    const min_value = image_50_50.offsetLeft;
    const max_value = image_50_50.offsetLeft + image_50_50.offsetWidth;
    const dx_capped = Math.min(Math.max(dx, min_value), max_value);
    const dx_percentage = (dx_capped - min_value) / (max_value - min_value) * 100
    console.log(dx_percentage);
    old_media.style.width = `${dx_percentage}%`;
    new_media.style.width = `${100 - dx_percentage}%`;
    slider.style.left = `${dx_percentage - 4}%`
}

