AOS.init();

$('#search-button').on('click', function() {

    $('.info').removeClass('col-md-10').addClass('col-md-12')
    $('.info').addClass('text-center')
    $('.info').html(`
            <img src="img/courier.gif" alt="courier" width="150" class="mt-5 img-fluid ">
    `);
    
    $.ajax({
        url: 'https://api.binderbyte.com/v1/track?api_key=1d7f2b73e0f95e85f9726b670f57be1f6975fec321cb815d1b76db75a7f68374&courier=anteraja&awb=10000394765684',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key' : '1d7f2b73e0f95e85f9726b670f57be1f6975fec321cb815d1b76db75a7f68374',
            'courier' : $('.kurir option:selected').val(),
            'awb' : $('#search-input').val()
        }, 
        statusCode: {
            200 : function(result) {
                const jasa = $('.kurir option:selected').text();
                let summary = result.data.summary;
                let detail = result.data.detail;
                let history = result.data.history.reverse();
                let tanggalKirim = history[0].date;

                $('.info').removeClass('text-center')
                $('.info').html(`
                    <div data-aos="zoom-in-down">
                    <div class="col-md-12 col-lg-6">
                    <h5 class="mb-2">I. Informasi Pengiriman</h5>
                    <table class="table table-hover">
                        <tbody>
                        <tr>
                            <th scope="row">No.Resi</th>
                            <td>:</td>
                            <td>${summary.awb}</td>
                        </tr>
                        <tr>
                            <th scope="row">Status</th>
                            <td>:</td>
                            <td>${summary.status}</td>
                        </tr>
                        <tr>
                            <th scope="row">Service</th>
                            <td>:</td>
                            <td>${summary.service}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tanggal pengiriman</th>
                            <td>:</td>
                            <td>${tanggalKirim}</td>
                        </tr>
                        <tr>
                            <th scope="row">Pengirim</th>
                            <td>:</td>
                            <td>${detail.shipper} <br> ${detail.origin}</td>
                        </tr>
                        <tr>
                            <th scope="row">Penerima</th>
                            <td>:</td>
                            <td>${detail.receiver} <br> ${detail.destination}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    <br>
                    <div class="col-md-12 col-lg-6">
                    <h5 class="mb-2">II. Status Pengiriman</h5>
                    <table class="table table-hover">
                        <thead>
                            <tr class="text-center">
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody class="history">
                            
                        </tbody>
                    </table>
                    </div>
                </div>
                `);

                $.each(history, function(i, data) { 
                    $('.history').append(`
                        <tr>
                            <td>${data.date}</td>
                            <td>${data.desc}</td>
                        </tr>
                    `);

                    $('#search-input').val('');
                });
            },
            400 : function(result) {

                $('.info').removeClass('col-md-15').addClass('col-md-10').removeClass('text-center')
                if( result.responseJSON.message == "Parameters `courier` and `awb` is required" ) {
                    $('.info').html(`
                    <div class="alert alert-danger" role="alert">
                        Harap masukkan <strong>nomor resi</strong> !
                    </div>
                    `);
                } else {
                    $('.info').removeClass('col-md-15').addClass('col-md-10').removeClass('text-center')
                    $('.info').html(`
                        <div class="alert alert-danger time-out" role="alert">
                            Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                        </div>
                    `);
                }
                // console.log(result.responseJSON.message);
            },
            500 : function() {
                $('.info').removeClass('col-md-15').addClass('col-md-10').removeClass('text-center')
                $('.info').html(`
                    <div class="alert alert-danger time-out" role="alert">
                        Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                    </div>
                `);
            }

        }
    }); 
});

