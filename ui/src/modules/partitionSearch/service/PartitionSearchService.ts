export class PartitionSearchService {
    private rules: Array<{condition: (name: string) => boolean, value: ((name: string) => string) | string}> = [
        {condition: (name: string) => name === "", value: "SYS"},
        {condition: (name: string) => name.endsWith("Activity") || name.endsWith("Container") || name.endsWith("Controller") || name.endsWith("ControllerV2") || name.endsWith("Fragment"), value: "SYS"},
        {condition: (name: string) => name.startsWith("OCR_"), value: "SYS"},
		{condition: (name: string) => name.startsWith("STUC_") || new RegExp("studycircle").test(name.toLowerCase()), value: "XXQ"},
		{condition: (name: string) => name.startsWith("MY_LEARN_") || name.startsWith("VIP") || name.startsWith("PLUSVIP_"), value: "VIP"},
		{condition: (name: string) => name.startsWith("PB_") || new RegExp("readworld").test(name.toLowerCase()) || new RegExp("read_world").test(name.toLowerCase()), value: "YD"},
		{condition: (name: string) => new RegExp("dubbing").test(name.toLowerCase()) || name.startsWith("oral_") || name.startsWith("speak_") || new RegExp("english_spoken").test(name.toLowerCase()), value: "KY" },
        {condition: (name: string) => name.startsWith("COMPOSITION_") || name.startsWith("COMP_") || new RegExp("COMPOSITION").test(name) , value: "ZW"},
		{condition: (name: string) => name.startsWith("BBJ_") || name.startsWith("SHOP") || name.startsWith("MALL_"), value: "SC"},
		{condition: (name: string) => name === "ACCEPT_SUCCESS_QUESTIONS", value: "WD"},
		{condition: (name: string) => name.startsWith("QB2_") || name.startsWith("HOMEWORK_") || name.startsWith("QUESTION_") || name.startsWith("CHIEF_VIP_") || name.startsWith("QB_") || name.startsWith("QB1_") || name.startsWith("QUES_"), value: "WD"},
		{condition: (name: string) => name.startsWith("WRONG_TOPIC") || name.startsWith("STUDY") || name.startsWith("ANSWER_SYN") || name.startsWith("STUDYCIRCLE_") || name.startsWith("SYNC_") || name.startsWith("BZ_") || name.startsWith("PRAC_") || name.startsWith("NOTEBOOK_") || name.startsWith("EXERCISE_") || name.startsWith("DISCOVE") || name.startsWith("COLLECT_") || new RegExp("PAPER").test(name) || new RegExp("findtab").test(name.toLowerCase()), value: "LX"},
		{condition: (name: string) => ["COLLECTION_JUMPTAGS_SHOW","KNOWLEDGE_DETAIL_STAY_TIME","PLAYERBACK_EXERCISE_SUBMMIT_CLICK"].filter(n => n === name).length > 0, value: "LX"},
        {condition: (name: string) => name.startsWith("ADX_") || name.startsWith("SPLASH_") || name.startsWith("SC_") || name.startsWith("GDT_") || name.startsWith("BRAND_") || name.startsWith("Flash_") || new RegExp("inmobi").test(name.toLowerCase()) || name.startsWith("AD_") || name.endsWith("_AD") || new RegExp("_AD_").test(name), value: "GG"},
        {condition: (name: string) => ["SBF_ALL","AdManager_ImplThread","Flash_InmobiSdk_Start","Flash_Launch_Timeout","REQ_LOG","SDK_FAILED_BY_PRIORITY"].filter(n => n === name).length > 0, value: "GG"},
        {condition: (name: string) => (new RegExp("feed").test(name.toLowerCase()) &&  !new RegExp("feedback").test(name.toLowerCase())) || name === "ARTICLE_DETAIL_LIKE_CLICK", value: "FEED"},
        {condition: (name: string) => name.startsWith("CAMERA_") || name.startsWith("PHOTO_") || name === "PHOTOABLUM_SELECT_PHOTO" || name.startsWith("DUR_"), value: "CAMERA"},
        {condition: (name: string) => name.startsWith("PIC_") || name.startsWith("PICTURE_ASK_") || name.startsWith("SEARCH_") || name.startsWith("SEARCHRESULT_") || name.startsWith("ASK_") || name.startsWith("AUTO_ANSWER_") || name.startsWith("VOICE_") || name.startsWith("TEXT_AUTO_"), value: "PS"},
        {condition: (name: string) => ["TEXT_AUTO_ANSWER_INPUT", "JUMP_TO_WORD_SEARCH"].filter(n => n === name).length > 0, value: "PS"},
        {condition: (name: string) => name.startsWith("PROGRESSION_") || name.startsWith("EXPLORING_") || name.startsWith("CLASSROOM_") || name.startsWith("LIVE_") || name.startsWith("ZHIBO_") || name.startsWith("ANDROID_VIDEO_") || name.startsWith("IOS_VIDEO_") || name.startsWith("IM_"), value: "YK"},
        {condition: (name: string) => /^[A-Z][0-9]+(_[0-9]+)*$/.test(name) || name.startsWith("F10"), value: "YK"},
        {condition: (name: string) => name.startsWith("AT_") || name.startsWith("FUDAO_1V1_") || new RegExp("askteacher").test(name), value: "DY"},
		{condition: (name: string) => new RegExp("PASSWORD").test(name) || new RegExp("PUSH").test(name), value: "JC"},
		{condition: (name: string) => ["INDEX_TAB_", "LOGIN", "MODIFY_", "RELOGIN_", "NEW_USER_", "SHARE_", "FORCE_LOGIN", "JIGUANG_LOGIN_"].filter(n => name.startsWith(n)).length > 0, value: "JC"},
		{condition: (name: string) => ["SYSTEM_MESSAGE_", "SYS_MESSAGE"].filter(n => name.startsWith(n)).length > 0, value: "JC"},
		{condition: (name: string) => new RegExp("MSG_RECV").test(name), value: "JC"},
		{condition: (name: string) => ["notification"].filter(n => new RegExp(n).test(name.toLowerCase())).length > 0, value: "JC"},
		{condition: (name: string) => ["MSG_RECV","URL_NOTIFY_SHOW","APP_URL_PUSH_SHOW", "HOT_WORD_RECOMMENDATION_CLECK"].filter(n => n === name).length > 0, value: "JC"},
		{condition: (name: string) => ["VIDEO_", "CHOICE", "GRADE_SELECT_", "GO_", "HOME_PAGE_", "HOME_TOOL", "HOMEPAGE_"].filter(n => name.startsWith(n)).length > 0, value: "JC"},
		{condition: (name: string) => ["WORD_", "TOOL_", "RECITE_", "CLASSICAL_", "SYE_PROTECT", "DICTIONARY_", "MORE_UNIT_"].filter(n => name.startsWith(n)).length > 0, value: "JC"},
		{condition: (name: string) => ["INIT_ACTIVITY_CREATE","UPDATE_DIALOG_SHOW","USER_FIRST_STARTAPP_IDFA","APPS","MY_IMEI"].filter(n => n === name).length > 0, value: "JC"},
		{condition: (name: string) => name.startsWith("USER_") || name.startsWith("USERCENTER_") || name.startsWith("DECORATION_") || name.startsWith("MYPROFILE") || name.startsWith("MYTAB_") || name.startsWith("MORE_") || new RegExp("SCHOOL").test(name), value: "TX"},
		{condition: (name: string) => ["UCENTER_PAGE","WEALTHSHOP_ENTRENCE_SHOW"].filter(n => name === n).length > 0, value: "TX"},
		{condition: (name: string) => /^(KZ|SM|ZJ|AS|KF|XS|HX)_[A-Z][0-9]+_[0-9]+_[0-9]+$/.test(name), value: "YK"},
		{condition: (name: string) => /^[A-Z]+_[A-Z][0-9]+_[0-9]+_[0-9]+$/.test(name), value: (name: string) => name.split("_")[0]},
		{condition: (name: string) => true, value: "SYS"}
    ]
    public Search(name: string): string {
        for(const rule of this.rules) {
			if(rule.condition(name)) {
				return typeof rule.value === "string" ? rule.value : rule.value(name);
			}
		}
		return "";
    }
}