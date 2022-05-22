<?
//----- ligne pour générer une erreur 404 si le visiteur est google. En effet google 
//----- a besoin de trouver une erreur 404 lors de la vérification de site effectue par
//----- l'outil sitemap.
if( ereg("^.*Google-Sitemaps.*$", $_SERVER['HTTP_USER_AGENT']) ){ 
	header("HTTP/1.0 404 Not Found");
	exit();
}
if (file_exists($HTTP_SERVER_VARS["DOCUMENT_ROOT"]."/index.php")) {
	header("Location: /index.php");
	exit();
}
if (file_exists($HTTP_SERVER_VARS["DOCUMENT_ROOT"]."/index.htm")) {
	header("Location: /index.htm");
	exit();
}
if(file_exists($HTTP_SERVER_VARS["DOCUMENT_ROOT"]."/home.htm")) {
	header("Location: /home.htm");
	exit();
}
?>