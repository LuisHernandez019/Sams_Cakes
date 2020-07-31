const buttons = document.querySelectorAll('a');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', function(e){//Investigar bien su función pa no quedar.
                    
                   let x = e.clientX - e.target.offsetLeft;
                   let y = e.clientY - e.target.offsetTop;

                    let ripples = document.createElement('span');
                    ripples.style.left = x +'px';
                    ripples.style.left = y +'px';
                    this.appendChild(ripples);

                    setTimeout(() =>{
                        ripples.remove()
                    }, 1000);
                })
            })