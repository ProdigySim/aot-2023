type AppendGood<GoodBois extends Record<string, unknown>> = {
	[K in keyof GoodBois as `good_${Extract<K, string>}`]: GoodBois[K]; 
};