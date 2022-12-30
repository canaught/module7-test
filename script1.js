$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
    localStorage.clear();
    sessionStorage.clear();
    const ip_address = JSON.stringify(data, 0, 2);
    console.log(ip_address);
    console.log(JSON.parse(ip_address)['ip']);
    sessionStorage.setItem("ip_address",JSON.parse(ip_address)['ip'] );
});
