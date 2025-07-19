using API.Controllers;
using Application.Common;
using Application.Dtos.AuthenticationDto;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.Serializer;
using Azure;
using Microsoft.AspNetCore.Mvc;

namespace BlazorPresentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : BaseGuestController
    {
        public AuthController(IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
             : base(authenticationService, jsonFieldsSerializer)
        {
        }

        /// <summary>
        /// Registers a new user.
        /// Route: POST /api/auth/register
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authenticationService.RegisterAsync(registerDto);
            if (!result.Succeeded)
            {
                // Assuming your exception middleware will handle this and return a proper 400 response.
                // Or you can construct a specific ApiResponse for failure.
                return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(new ApiResponse(false, "Registration failed.", StatusCodes.Status400BadRequest, result.Errors), string.Empty));
            }
            var apiResponse = new ApiResponse(true, "User registered successfully", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        /// <summary>
        /// Logs in a user and returns a JWT token.
        /// Route: POST /api/auth/login
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<AuthUserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var authUser = await _authenticationService.LoginAsync(loginDto);
            var apiResponse = new ApiResponse(true, "Login successful", StatusCodes.Status200OK, authUser);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        /// <summary>
        /// Logs out the currently authenticated user.
        /// Route: POST /api/auth/logout
        /// </summary>
         [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            await _authenticationService.LogoutAsync();
            var apiResponse = new ApiResponse(true, "Logged out successfully", StatusCodes.Status200OK);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        /// <summary>
        /// Gets the details of the currently authenticated user.
        /// Route: GET /api/auth/GetAuthenticatedUser
        /// </summary>
         [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<AuthUserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAuthenticatedUser()
        {
            var user = await _authenticationService.GetAuthenticatedUser();
            var apiResponse = new ApiResponse(true, "User data retrieved successfully", StatusCodes.Status200OK, user);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}