package com.oxchains.pharmacy;

import com.oxchains.pharmacy.auth.AuthError;
import com.oxchains.pharmacy.auth.JwtAuthenticationProvider;
import com.oxchains.pharmacy.auth.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

/**
 * @author aiet
 */
@EnableWebSecurity
@Configuration
public class AppConfiguration extends WebSecurityConfigurerAdapter {

  private final JwtTokenFilter jwtTokenFilter;
  private final JwtAuthenticationProvider jwtAuthenticationProvider;
  private final AuthError authError;

  public AppConfiguration(@Autowired JwtTokenFilter jwtTokenFilter, @Autowired JwtAuthenticationProvider jwtAuthenticationProvider, @Autowired AuthError authError) {
    this.jwtTokenFilter = jwtTokenFilter;
    this.jwtAuthenticationProvider = jwtAuthenticationProvider;
    this.authError = authError;
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
        .cors()
        .and()
        .csrf()
        .disable()
        .authorizeRequests()
        .antMatchers(POST, "/user")
        .permitAll()
        .antMatchers(
            "/token", "/vcode","/user/**/downloadfile",
            "/user/application", "/user/simple", "/user/type",
            "/user/secret/reset", "/user/secret/reset/vcode"
        )
        .permitAll()
        .antMatchers("/**/*")
        .authenticated()

        .and()
        .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling()
        .authenticationEntryPoint(authError)
        .accessDeniedHandler(authError);
  }

  @Override
  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(jwtAuthenticationProvider);
  }

  /**
   * allow cross origin requests
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {

      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "OPTIONS", "DELETE")
            .allowedHeaders("*");
      }
    };
  }
}
