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
    log.debug(" ----------- 1" );
    var tFindElem = null;
	var tResult = server.GetUserData( request );
	var tData = JSON.parse(tResult.Data.emails.Value);
	if( tData != null ){
		log.debug(" ----------- 2" );
		for(elem in tData){
			log.debug(" ----------- 3" + elem.ID );
			if(elem.ID==args.ID){
				tFindElem = tFindElem;
			}
		};
	}
    return tFindElem;
}