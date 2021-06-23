//package by.softarex.questionsportal.util.webfilter;
//
//import org.springframework.stereotype.Component;
//
//import javax.servlet.*;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//
//@Component
//@WebFilter("/*")
//public class AuthenticationFilter implements Filter {
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest request = (HttpServletRequest) servletRequest;
//        HttpServletResponse response = (HttpServletResponse) servletResponse;
//        HttpSession session = request.getSession(false);
//
//        String loginURI = request.getContextPath() + "/login";
//        String logoutURI = request.getContextPath() + "/logout";
//        String registrationURI = request.getContextPath() + "/registration";
//
//        boolean loggedIn = session != null && session.getAttribute("authenticated") != null;
//        boolean loginRequest = request.getRequestURI().equals(loginURI);
//        boolean logoutRequest = request.getRequestURI().equals(logoutURI);
//        boolean registrationRequest = request.getRequestURI().equals(registrationURI);
//
//        if (registrationRequest || logoutRequest || loggedIn || loginRequest) {
//            filterChain.doFilter(request, response);
//        } else {
//            response.sendError(401, "Unauthorized");
//        }
//
//    }
//}
