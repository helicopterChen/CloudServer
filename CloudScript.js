handlers.TestScript = function (args) {
	var request = 
    {
        PlayFabId :currentPlayerId
    };
    var tUserData = server.GetUserData(request);
	return {result: tUserData}
};
