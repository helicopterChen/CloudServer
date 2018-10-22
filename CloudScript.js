handlers.TestScript = function (args) {
	var request = 
    {
        PlayFabId :currentPlayerId
    };
    var tUserData = server.GetUserData(request);
	return {result: tUserData}
};


handlers.AddEmailToPlayer = function (args) {
	var request = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "Emails":"-----------------"
		}
    };
    return server.UpdateUserData(request);  
};
