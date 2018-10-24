handlers.TestScript = function (args) {
	var request = 
    {
        PlayFabId :currentPlayerId
    };
    var tUserData = server.GetUserData(request);
	return {result: tUserData}
};


handlers.AddEmailToPlayer = function (args) {
	var test=[
		{ID:1,Name:"email_1"},
		{ID:2,Name:"email_2"},
		{ID:3,Name:"email_3"}
	];
	var request = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "Emails":JSON.stringify(test)
		}
    };
    return server.UpdateUserData(request);
};

handlers.PlayerReadMail = function(args) {
	var request = 
	{
        PlayFabId:currentPlayerId,
        Keys:[
            "emails"
        ]
    };
    log.debug(args);
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData != null ){
		for(var i = 0; i < tData.Legth; ++i ){
			var elem = tData[i];
			log.debug(elem);
		};
	}
    return tData;
}