const del = document.getElementsByClassName('delete-btn')

function deleteListElement(){
    var id = this.parentNode.getAttribute('data-id');
    fetch('/todos/' + id, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.parentNode.remove();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
   }


Array.from(del).forEach((btn) => {
    const id = btn.parentElement.dataset.id
    btn.addEventListener("click", () => {
        fetch('/todos/' + id, {
            method : 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            btn.parentElement.remove()
        })
        // .catch((error) => {
        //     error.json();
        // })
    })
})
