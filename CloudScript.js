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
    var tFindElem = null;
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData == null ){
		return;
	}
	for(idx in tData){
		var elem = tData[idx];
		if(elem.ID==args.ID){
			tFindElem = elem;
			tData.Readed = true;
			break;
		}
	};
	var request2 = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "Emails":JSON.stringify(tData)
		}
    };
	server.UpdateUserData(request2);
    return tFindElem;
}