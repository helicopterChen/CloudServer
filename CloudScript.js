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
    var bFindElem = false;
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData == null ){
		return;
	}
	for(idx in tData){
		var elem = tData[idx];
		if(elem.ID==args.ID){
			bFindElem = true;
			elem.Read = true;
			break;
		}
	};
	if( bFindElem != true ){
		return;
	}
	var request2 = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "emails":JSON.stringify(tData)
		}
    };
	server.UpdateUserData(request2);
}

handlers.PlayerGetMailReward = function(args) {
	var request = 
	{
        PlayFabId:currentPlayerId,
        Keys:[
            "emails"
        ]
    };
    var bFindElem = false;
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData == null ){
		return;
	}
	for(idx in tData){
		var elem = tData[idx];
		if(elem.ID==args.ID){
			bFindElem = true;
			elem.GetReward = true;
			break;
		}
	};
	if( bFindElem != true ){
		return;
	}
	var request2 = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "emails":JSON.stringify(tData)
		}
    };
	server.UpdateUserData(request2);
}