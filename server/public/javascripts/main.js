$(document).ready(function(){
    $(".modal-popup").click(function(){ // Click to only happen on announce links
        $("#pharm_id").val($(this).data('pharm-id'));
        $("#pharm_co_name").val($(this).data('pharm-co-name'));
        $("#supervisor").val($(this).data('supervisor'));
        $("#text").val($(this).data('text'));

        // Work around for jQuery bug

        var startDate = new Date($(this).data('start-date'));
        var day = ("0" + startDate.getDate()).slice(-2);
        var month = ("0" + (startDate.getMonth()+1)).slice(-2);
        startDate = startDate.getFullYear() + "-" + month + "-" + day;
        $("#start_date").val(startDate);

        var endDate = new Date($(this).data('end-date'));
        var day = ("0" + endDate.getDate()).slice(-2);
        var month = ("0" + (endDate.getMonth()+1)).slice(-2);
        endDate = endDate.getFullYear() + "-" + month + "-" + day;
        $("#end_date").val(endDate);

        $("#contractUpdateTitle").text($(this).data('pharm-name') 
        + ' - ' + $(this).data('pharm-co-name'));

        $('#updateContractModal').modal('show');
    });
});