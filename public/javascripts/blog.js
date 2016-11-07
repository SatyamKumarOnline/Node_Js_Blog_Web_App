/**
 * Created by kumars on 26/10/16.
 */

var Blog = function() {

};

Blog.showForm = function(ev){
    ev.preventDefault();
    $(this).tab('show');
    document.forms[0].style.display = '';
};

/* To do :- Optimization stuff, donot fire 'showAll' request on
   clicking ALLPost Tab, think of some other logic.
 */


Blog.showAllBlog = function(ev){
            ev.preventDefault();
            $(this).tab('show');
            document.forms[0].style.display = 'none';
            // To do: - fire request to fetch the blog content, showAll
    $.ajax({
        url : '/showAll',
        async : true
    }).done(function(resData){
        var blogData = resData;
        console.log(resData);
        // write code to show the JSON response data in UI.
    });

};

Blog.constructBlogUI = function(){
};





