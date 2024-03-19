window.onload = () => {
    const cur_year = new Date().getFullYear();
    if (cur_year)
        document.getElementById("currentYear").textContent = ` ${cur_year} `;
    
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
    document.getElementById('first').addEventListener('mousemove', e => {
        // Callback function
        const dX = -e.clientX / 60;
        const dY = (-e.clientY + (window.innerHeight)) / 60;
        gordon.style.transform = `translate3d(${dX}px, ${dY}px, 0px)`
    })
}