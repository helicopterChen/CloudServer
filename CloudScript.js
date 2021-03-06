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
        PlayFabId:currentPlayerId,
        Keys:[
            "emails"
        ]
    };
    var requestTitle = 
    {
    	Keys:[
    		"email_templates"
    	]
    };
    var tEmailResult = server.GetUserData( request );
    var tTemplatesResult = server.GetTitleData(requestTitle)
	var tTemplateData = JSON.parse(tTemplatesResult.Data.email_templates);
	if( tTemplateData == null ){
		return;
	}
	var tNewMails = [];
	if(tEmailResult.Data.emails != null)
	{
		var tMailData = JSON.parse(tEmailResult.Data.emails.Value);
		for(index2 in tMailData){
			var mail = tMailData[index2];
			tNewMails.push(mail);
		};
	}
	for(idx in tTemplateData){
		var templates = tTemplateData[idx];
		var bFound = false;
		for(index in tMailData){
			var mail = tMailData[index];
			if( mail.ID == templates.ID ){
				bFound = true;
				break;
			}
		};
		if(bFound != true){
			tNewMails.push(templates);
		}
	};
	var request2 = 
    {
        PlayFabId :currentPlayerId,
	    "Data": 
	    {
		    "emails":JSON.stringify(tNewMails)
		}
    };
    server.UpdateUserData(request2);
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