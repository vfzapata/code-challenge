showToolTip = () => {
    let tooltip = {
        Title: 'This is the title',
        Content: 'This is the content',
        onApprove: function () {
            $('#close').click(function () {
                $('.tooltip, .tooltiptext').css('visibility', 'hidden');
            });
        }
    }
    $('.tooltip').append(`<span class="tooltiptext">${tooltip.Title} <br> ${tooltip.Content} <button id="close" onclick='${tooltip.onApprove()}'>OK</button></span>`);

};

$('.tooltip.span').hover(function () {
    showToolTip();
});