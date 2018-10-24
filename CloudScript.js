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
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData != null ){
		tData.foreach(function(value,index,array){
			log.debug(value);
		});
	}
    return tData;
}