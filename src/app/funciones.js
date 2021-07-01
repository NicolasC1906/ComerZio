// Quantity
export let Quantity = {

  fnc:function(){
    $(".quantity").each(function(){
      var spiner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUP = spinner.find('.up'),
      btnDown = spinner.find('.Down'),
      min = input.attr("min"),
      max = input.attr("max")

      btnUP.click(function(){
        var oldValue = parseInt(input.val());

        if(oldValue >= max){
            var newVal = oldValue;
        }else{
            var newVal = oldValue + 1;
        }

        input.val(newVal)
        input.trigger("change")

      })

      btnDown.click(function(){
        var oldValue = parseInt(input.val());

        if(oldValue <= min){
            var newVal = oldValue;
        }else{
            var newVal = oldValue - 1;
        }

        input.val(newVal)
        input.trigger("change")
        console.log("Hola");
      })

    })
  }

}

export let Sweetalert = {
  fnc:function(){
      Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'Usuario Registrado Correctamente',
        })


  }
}

/*=============================================
Pagination
=============================================*/
export let Pagination = {

    fnc: function(){

        var target = $('.pagination');

        if (target.length > 0) {

            target.each(function() {

                var tg = $(this),
                    totalPages = tg.data('total-pages'),
                    actualPage = tg.data('actual-page'),
                    currentRoute = tg.data('current-route');

                tg.twbsPagination({
                    totalPages: totalPages,
                    startPage: actualPage,
                    visiblePages: 4,
                    first: "First",
                    last: "Last",
                    prev: '<i class="fas fa-angle-left"></i>',
                    next: '<i class="fas fa-angle-right"></i>'
                }).on("page", function(evt, page){

                     window.location.href = currentRoute+"&"+page;

                })


            })
        }

    }

}
