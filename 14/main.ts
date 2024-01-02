type DecipherNaughtyList<List extends string> = 
	List extends `${infer U}/${infer Rest}` ? U | DecipherNaughtyList<Rest> : List;
